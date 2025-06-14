import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTgiIGhlaWdodD0iOTgiIHZpZXdCb3g9IjAgMCA5OCA5OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxjaXJjbGUgY3g9IjQ5IiBjeT0iNDkiIHI9IjQ5IiBmaWxsPSIjRjVGNUY1Ii8+DQo8cGF0aCBkPSJNNDkuMTAwOCA0Ni4xMDAxQzUyLjQ0MjIgNDYuMTAwMSA1NS4xNTA5IDQzLjM5MTQgNTUuMTUwOSA0MC4wNTAxQzU1LjE1MDkgMzYuNzA4NyA1Mi40NDIyIDM0IDQ5LjEwMDggMzRDNDUuNzU5NSAzNCA0My4wNTA4IDM2LjcwODcgNDMuMDUwOCA0MC4wNTAxQzQzLjA1MDggNDMuMzkxNCA0NS43NTk1IDQ2LjEwMDEgNDkuMTAwOCA0Ni4xMDAxWiIgZmlsbD0iI0FBQUFBQSIvPg0KPHBhdGggb3BhY2l0eT0iMC41IiBkPSJNNjEuMjAwMiA1Ny40NDNDNjEuMjAwMiA2MS4yMDIxIDYxLjIwMDIgNjQuMjQ5MyA0OS4xMDAxIDY0LjI0OTNDMzcgNjQuMjQ5MyAzNyA2MS4yMDIxIDM3IDU3LjQ0M0MzNyA1My42ODQgNDIuNDE3NCA1MC42MzY3IDQ5LjEwMDEgNTAuNjM2N0M1NS43ODI4IDUwLjYzNjcgNjEuMjAwMiA1My42ODQgNjEuMjAwMiA1Ny40NDNaIiBmaWxsPSIjQUFBQUFBIi8+DQo8L3N2Zz4NCg==" },
  address: { type: Object, default:{line1:'', line2:''} },
  gender:{type:String, default:"Not Selected"},
  dob:{type:String, default:"Not Selected"},
  phone:{type:String, default:'000000000'},
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel