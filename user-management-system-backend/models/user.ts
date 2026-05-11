import mongoose, { Schema, Model, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";

/* =========================================
   Allowed Roles
========================================= */
export type UserRole = "admin" | "manager" | "user";

/* =========================================
   User Fields
========================================= */
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  is_active: boolean;
}

/* =========================================
   Custom Document Methods
========================================= */
interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

/* =========================================
   Model Type
========================================= */
type UserModel = Model<IUser, {}, IUserMethods>;

/* =========================================
   Real MongoDB Document Type
========================================= */
type UserDocument = HydratedDocument<IUser, IUserMethods>;

/* =========================================
   Schema
========================================= */
const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: 2
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },

    role: {
      type: String,
      enum: ["admin", "manager", "user"],
      default: "user"
    },

    is_active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);


userSchema.pre("save", async function () {
  const user = this as UserDocument;

  if (!user.isModified("password")) return 

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

});

/* =========================================
   Compare Password Method
========================================= */
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

/* =========================================
   Hide Sensitive Fields
========================================= */
userSchema.set("toJSON", {
  transform: function (_, ret) {
    delete (ret as any).password;
    delete (ret as any).__v;
    return ret;
  }
});

/* =========================================
   Export Model
========================================= */
const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;