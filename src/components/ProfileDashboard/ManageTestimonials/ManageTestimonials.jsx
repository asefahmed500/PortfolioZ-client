import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useToast from "../../../Hooks/useToast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ManageTestimonials = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state
  const axiosPublic = useAxiosPublic();

  const { showToast } = useToast();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    setLoading(true);  // Set loading to true when submitting

    const TestimonialData = {
      TestimonialpersonName: data.name,
      Testimonial : data.testimonial,
      PersonRole: data.role,
      PersonImage: data.image,
      userEmail: user.email
    };

    try {
      const res = await axiosPublic.post('/testimonials', TestimonialData);
      if (res.data.message && res.data.TestimonialID) {
        showToast(`${data.name} has been added to the Resume`);
        reset();
      } else {
        showToast("Error adding Testimonial");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      showToast("Error adding skill");
    } finally {
      setLoading(false);  // Set loading to false after submission
    }

    setImagePreview(''); // Reset the image preview
  };

  const handleImageChange = (event) => {
    const imageUrl = event.target.value;
    setImagePreview(imageUrl);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-center mt-5 font-serif text-3xl text-blue-950">Add Testimonial</h2>
        <div className="flex items-center justify-center mt-10">
          <div className="card bg-blue-950 w-full max-w-lg rounded-lg shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-4 p-6">
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white font-semibold">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>

              {/* Role Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white font-semibold">Role</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Role (e.g., Software Engineer at TechCorp)"
                  {...register("role", { required: "Role is required" })}
                  className="input input-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.role && <span className="text-red-500 text-sm">{errors.role.message}</span>}
              </div>

              {/* Testimonial Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white font-semibold">Testimonial</span>
                </label>
                <textarea
                  placeholder="Write the testimonial here"
                  {...register("testimonial", { required: "Testimonial is required" })}
                  className="textarea textarea-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                {errors.testimonial && <span className="text-red-500 text-sm">{errors.testimonial.message}</span>}
              </div>

              {/* Image URL Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white font-semibold">Image URL</span>
                </label>
                <input
                  type="url"
                  placeholder="Enter Image URL"
                  {...register("image", { 
                    required: "Image URL is required", 
                    pattern: {
                      value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))$/i,
                      message: "Please enter a valid image URL (e.g., .png, .jpg)"
                    }
                  })}
                  onChange={handleImageChange}
                  className="input input-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white font-semibold">Image Preview</span>
                  </label>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 object-cover mx-auto rounded-md"
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="flex items-center justify-center mt-6">
                <button
                  type="submit"
                  disabled={loading}  // Disable the button while loading
                  className="btn bg-black text-white hover:bg-white hover:text-blue-950 transition duration-200 ease-in-out shadow-md px-6 py-2 rounded"
                >
                  {loading ? "Adding..." : "Add Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTestimonials;
