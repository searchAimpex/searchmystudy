import mongoose from 'mongoose';
import Country from '../backend/models/countryModel.js'; // Update with the path to your model

// Replace the connection string with your MongoDB Atlas connection string
const uri = "mongodb+srv://admissionpanels:1234@cluster0.nywd6pf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/karuna";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB Atlas');

  // Update documents to include mbbsAbroad with default value false
  await Country.updateMany(
    { mbbsAbroad: { $exists: false } },
    { $set: { mbbsAbroad: false } }
  );

  console.log('Update complete');
  mongoose.disconnect();
})
.catch(error => {
  console.error('Error connecting to MongoDB Atlas:', error);
});
