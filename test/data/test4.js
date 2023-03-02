function persona(name, age, height) {
  let nombre = name;
  let edad = function (edad) { return edad * edad; }(age);
  let altura = (altura => { return altura + 1; })(height);
  console.log(nombre, edad, altura);
}
persona('pepito', 20, 10);