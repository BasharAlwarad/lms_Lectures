import User from '../models/userModel.js';
import { bucket } from '../config/firebaseConfig.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const image = req.file;
  console.log(image);
  const user = new User({
    name,
    email,
    password,
  });

  let uploadedImageUrl = '';

  try {
    let blob;
    let buffer;
    let contentType = 'image/png'; // Default content type

    // creating image to upload to firebase storage
    if (image) {
      contentType = image.mimetype; // Use the actual mimetype
      blob = bucket.file(
        `images/${name}/userImage/${Date.now()}_${image.originalname}`
      );
      buffer = image.buffer;
    }

    if (blob) {
      const blobStream = blob.createWriteStream({
        metadata: { contentType },
      });

      await new Promise((resolve, reject) => {
        blobStream.on('error', (err) =>
          reject((err, 'Error uploading image to Firebase Storage'))
        );
        blobStream.on('finish', resolve);
        blobStream.end(buffer);
      });

      const signedUrl = await blob.getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
      });
      uploadedImageUrl = signedUrl[0];
      user.userImage = uploadedImageUrl;
      console.log(user);
    }
  } catch (error) {
    return next(new CustomError('Image upload failed', 500));
  }

  // if (image) {

  //   user.image = firebaseUrl;
  // }

  await user.save();
  res.status(201).json(user);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.status(200).json({ message: 'Get one users', user });
};
export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, {
    name,
    email,
    password,
  });

  res.status(200).json({ message: 'update users', user });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  res.json({ message: 'delete users', user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.find({ email, password });
  res.json({ message: 'login successful', user });
};
