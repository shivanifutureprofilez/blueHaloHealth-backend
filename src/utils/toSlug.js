const toSlug = (str) => {
  console.log("slug str ", str);

  if (str) {
    return str
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  } else {
    return "";
  }
};

module.exports = {
  toSlug
};
