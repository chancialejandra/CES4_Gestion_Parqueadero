## Descripción 
En la dirección de tecnología del politécnico Jaime Isaza Cadavid, de plantea construir una aplicación
web para realizar la gestión y administración del parqueadero que cumpla con los siguientes requisitos:

1. Debe haber un Login, usuario y contraseña, estos pueden ser estar en un state por defecto, no
hay que hacer registro de estos.
2. Los vehículos permitidos que pueden ingresar al parqueadero de la sede Medellín son: carros y
motos.
3. Cada empleado deberá registrar previamente los vehículos con los que cuenta, registrando para:
  • motos: número de placa, cilindraje y marca
  • carros: número de placa, modelo y marca
Se deben hacer las validaciones correspondientes.
  • Las placas son únicas, al igual que el documento de identidad.
  • Para la marca, modelo y cilindraje se recomienda usar una lista de valores que se pueda
seleccionar.
4. Al momento de ingresar al parqueadero el vigilante deberá registrar por medio de la cedula del
empleado o por la placa del vehículo, el ingreso, registrando la fecha y hora de entrada, y el
número de celda en la cual se va a parquear el vehículo.
a. Si el vigilante ha ingresado una cédula, se le deben mostrar todos los vehículos asociados a
ese número de cedula, para después seleccionar el que está ingresando.
b. Si el vigilante ingresó un número de placa, se le debe mostrar toda la información relacionada
al vehículo y después marcar su entrada.
c. Se cuenta con N celdas para carro y M celdas para motos (vía libre para definir esos valores,
mínimo 5)
5. Visualizar en una página las celdas del parqueadero, cuales estas disponibles y cuales ocupadas
con información respectiva.
6. La aplicación debe permitir la salida de los vehículos del parqueadero, para que quede de nuevo
habilitada la celda que tenía ocupada.
## Que se debe utilizar:
• React Router
• Hooks
• Context
• Componentes
• Opcional Librería UI
