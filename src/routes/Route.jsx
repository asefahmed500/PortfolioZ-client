import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Root from "../components/Root/Root";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import ProfileDashboard from "../components/ProfileDashboard/ProfileDashboard";
import Profile from "../components/ProfileDashboard/Profile/Profile";
import ViewPortfolio from "../components/ViewPortfolio/ViewPortfolio";
import PrivateRoutes from "../components/PrivateRoutes/PrivateRoutes";
import ManageProject from "../components/ProfileDashboard/Manage Project/ManageProject";
import ViewProject from "../components/ProfileDashboard/ViewProject/ViewProject";
import UpdateProject from "../components/ProfileDashboard/UpdateProject/UpdateProject";
import ManageSkills from "../components/ProfileDashboard/ManageSkills/ManageSkills";
import ViewSkills from "../components/ProfileDashboard/ViewSkills/ViewSkills";
import UpdateSkill from "../components/ProfileDashboard/UpdateSkill/UpdateSkill";
import ManageTestimonials from "../components/ProfileDashboard/ManageTestimonials/ManageTestimonials";
import UpdateTestimonial from "../components/ProfileDashboard/UpdateTestimonial/UpdateTestimonial";
import ViewTestimonials from "../components/ProfileDashboard/ViewTestimonials/ViewTestimonials";
import ManageBlogs from "../components/ProfileDashboard/ManageBlogs/ManageBlogs";
import ViewBlogs from "../components/ProfileDashboard/ViewBlogs/ViewBlogs";
import UpdateBlog from "../components/ProfileDashboard/UpdateBlog/UpdateBlog";
import Pricing from "../components/Pricing/Pricing";
import About from "../components/About/About";
import Publishportfolio from "../components/ProfileDashboard/Publishportfolio/Publishportfolio";
import DynamicPortfolio from "../components/DynamicPortfolio/DynamicPortfolio";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "viewportfolio",
        element: (
          <PrivateRoutes>
            <ViewPortfolio />
          </PrivateRoutes>
        ),
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "/portfolio/:email",
        element: <DynamicPortfolio />,
      },
      {
        path : "publishportfolio",
        element: <Publishportfolio></Publishportfolio>
      }
    ],
  },
  {
    path: "/profiedashboard",
    element: (
      <PrivateRoutes>
        <ProfileDashboard />
      </PrivateRoutes>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "manageproject",
        element: <ManageProject />,
      },
      {
        path: "viewproject",
        element: <ViewProject />,
      },
      {
        path: "updateproject/:id",
        element: <UpdateProject />,
        loader: async ({ params }) => {
          const response = await fetch(`https://portfolioz-server.onrender.com/projects/${params.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch project");
          }
          const data = await response.json();
          console.log("Loaded project data:", data);
          return data;
        },
      },
      {
        path: "manageskills",
        element: <ManageSkills />,
      },
      {
        path: "viewskills",
        element: <ViewSkills />,
      },
      {
        path: "updateskill/:id",
        element: <UpdateSkill />,
        loader: async ({ params }) => {
          const response = await fetch(`https://portfolioz-server.onrender.com/skills/${params.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch skills");
          }
          const data = await response.json();
          console.log("Loaded skill data:", data);
          return data;
        },
      },
      {
        path: "managetestimonials",
        element: <ManageTestimonials />,
      },
      {
        path: "viewtestimonials",
        element: <ViewTestimonials />,
      },
      {
        path: "updatetestimonial/:id",
        element: <UpdateTestimonial />,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`https://portfolioz-server.onrender.com/testimonials/${params.id}`);
            if (!response.ok) {
              throw new Error("Failed to fetch testimonial data");
            }
            const data = await response.json();
            if (!data) {
              throw new Error("No testimonial data found");
            }
            console.log("Loaded testimonial data:", data);
            return data;
          } catch (error) {
            console.error(error);
            throw new Error("Error loading testimonial data");
          }
        },
      },
      {
        path: "manageblog",
        element: <ManageBlogs />,
      },
      {
        path: "viewblog",
        element: <ViewBlogs />,
      },
      {
        path: "updateblog/:id",
        element: <UpdateBlog />,
        loader: async ({ params }) => {
          if (!params.id) {
            throw new Error("Invalid Blog ID");
          }
          try {
            const response = await fetch(`https://portfolioz-server.onrender.com/blogs/${params.id}`);
            if (!response.ok) {
              throw new Error("Failed to fetch Blog data");
            }
            const data = await response.json();
            console.log("Fetched Blog Data:", data);
            if (!data || Object.keys(data).length === 0) {
              throw new Error("No Blog data found");
            }
            return data;
          } catch (error) {
            console.error(error);
            throw new Error("Error loading Blog data");
          }
        },
      },
      
    ],
  },
]);
