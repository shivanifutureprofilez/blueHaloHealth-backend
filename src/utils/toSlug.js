export const toSlug = (str) => {
        console.log("slug str ",str);
    if (str) {
        console.log("str : ",str);
      return str
        .toLowerCase()
        .trim()
        .normalize("NFD")                 // split accented letters
        .replace(/[\u0300-\u036f]/g, "")  // remove accents
        .replace(/[^a-z0-9]+/g, "-")      // remove non-alphanumerics
        .replace(/^-+|-+$/g, "");         // trim hyphens
    } else {
      return ''
    }
  };

