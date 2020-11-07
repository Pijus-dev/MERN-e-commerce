import bcrypt from "bcryptjs";

const users = [
  {
    name: "adminUser",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Laura Siupieniute",
    email: "laurute@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "pijus",
    email: "pjuice@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
export default users;
