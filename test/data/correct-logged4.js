function persona(name, age, height) {
  console.log(`Entering persona(${name}, ${age}, ${height}) at line 1`);
  let nombre = name;
  let edad = function (edad) {
    console.log(`Entering <anonymous function>(${edad}) at line 3`);
    return edad * edad;
  }(age);
  let altura = (altura => {
    console.log(`Entering <anonymous function>(${altura}) at line 4`);
    return altura + 1;
  })(height);
  console.log(nombre, edad, altura);
}
persona('pepito', 20, 10);
