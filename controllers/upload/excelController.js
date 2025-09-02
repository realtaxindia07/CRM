const xlsx = require('xlsx');
const  ExpressError  = require("../../utils/CustomError");
const { wrapAsync } = require("../../utils/wrapAsync");
const leadSchemaValidation = require("../../models/joiSchemaValidation/leadValidation");
const Lead = require("../../models/dashboard/leadManagement");
const Info = require("../../models/dashboard/userInfo");
const User=require("../../models/userSchema")

module.exports.excelController = wrapAsync(async (req, res) => {
  const file = req.file;

  if (!file) {
    throw new ExpressError(400, 'No file uploaded');
  }
  if(!file.originalname.endsWith('.xlsx')) {
    throw new ExpressError(400, `File format must be ".xlsx"`);
  }
  const workbook = xlsx.read(file.buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);
  if(!data || data.length === 0) {
      throw new ExpressError(400, 'Invalid Excel file');
    }
  data.forEach((row, index) => {
      const { error } = leadSchemaValidation.validate(row);
      if (error) {
        throw new ExpressError(400, `some error in your file, row no. ${index + 2}.`);
      }
  });
  const user = await User.findById(req.user.id);
  for(const row of data) {
      const {name, email, phone,address} = row;
      const newInfo=new Info({name, email, phone,address});
      await newInfo.save();
      const newLead = new Lead({ ...row, userInfo: newInfo._id });
      await newLead.save();
      user.leads.push(newLead._id);
      await user.save();
  };
  res.status(200).json({
    message: 'Data uploaded successfully',
    count: data.length,
  });
});
