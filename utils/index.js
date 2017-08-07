function urlify(url) {
  const regex = /[^a-z\-_\(\)]*/ig;
  url = url.replace(regex, '');
  return url;
}

//console.log(urlify("hi this is my thing! (it's cool)"));

module.exports = {
  urlify
}
