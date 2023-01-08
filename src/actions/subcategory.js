import axios from "axios";
import history from "../history";

const ROOT_URL = "http://localhost:5000";

//action creator for Subcategory Master
export const addSubcategory = async (values, authtoken) => {
  const res = await axios.post(`${ROOT_URL}/api/subcategory`, values, {
    headers: { authtoken },
  });
  history.push("/admin/subcategories/subcategorieslist");
};

export const fetchSubcategories = async () => {
  return await axios.get(`${ROOT_URL}/api/subcategories`);
};

export const fetchSubcategory = async (slug) => {
  return await axios.get(`${ROOT_URL}/api/subcategory/${slug}`);
};

export const editSubcategory = async (slug, formValues, authtoken) => {
  console.log("Formvalues from edit subcategory", formValues);
  const res = await axios.put(
    `${ROOT_URL}/api/subcategory/${slug}`,
    formValues,
    { headers: { authtoken } }
  );
  history.push("/admin/subcategories/subcategorieslist");
};

export const deleteSubcategory = async (slug, authtoken) => {
  await axios.delete(`${ROOT_URL}/api/subcategory/${slug}`, {
    headers: { authtoken },
  });
  history.push("/admin/subcategories/subcategorieslist");
};

export const fetchSubcatVendors = async (slug) => {
  return await axios.get(`${ROOT_URL}/api/subcategories/vendor/${slug}`);
};
