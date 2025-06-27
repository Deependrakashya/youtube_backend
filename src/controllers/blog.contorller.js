import { Blog } from "../models/blog.model.js";
import { ApiErrors } from "../utils/api_errors.js";
import { ApiResponse } from "../utils/api_response.js";
import { asyncHandler } from "../utils/async_handler.js";

export const uploadBlog = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { title, description } = req.body;

  if (!(title || description)) {
    throw new ApiErrors(409, "title and descritpion both are required");
  }

  try {
    const blog = await new Blog({ title, description });

    await blog.save();
    return res
      .status(200)
      .json(new ApiResponse(200, `${blog.title} blog submited !!`));
  } catch (error) {
    console.log("error on saving blog ", error);
    throw new ApiErrors(400, "internal server error blog could not saved ");
  }
});

export const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ created: -1 });
    return res
      .status(200)
      .json(new ApiResponse(200, blogs, "blogs Fetched successfully !!"));
  } catch (error) {
    throw new ApiErrors(500, "Internal server error !!");
  }
});
export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new ApiErrors(400, "blog id not found ");
  }
  try {
    const blog = await Blog.findByIdAndDelete(id);
    return res.status(201).json(
      new ApiResponse(201, `${blog.title} blog deleted successfully !!`)
    )
  } catch (error) {
    console.log("could not deleted ", error);
    throw new ApiErrors(500, "blog could not deleted !!");
  }
});
