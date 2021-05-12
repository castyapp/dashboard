function log(gateway, message, color) {
  console.log(
    `%c[${gateway}]` + `%c ${message}`, 
    "font-size: 13px; color:#FFFFFF;", 
    `font-size: 13px; color:${color};`
  );
}

export default log;
