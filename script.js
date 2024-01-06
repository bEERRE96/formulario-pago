let expedientes = [];

function agregarExpediente() {
  const cliente = document.getElementById("cliente").value;
  const materia = document.getElementById("materia").value;
  const estado = document.getElementById("estado").value;
  const fechaConfirmacion = document.getElementById("fechaConfirmacion").value;
  const situacion = document.getElementById("situacion").value;
  const presupuesto = document.getElementById("presupuesto").value;
  const comentarios = document.getElementById("comentarios").value;
  const cantCuotas = document.getElementById("cantCuotas").value;
  const numCuota = document.getElementById("numCuota").value;
  const vencimiento = document.getElementById("vencimiento").value;
  const moneda = document.getElementById("moneda").value;
  const saldo = document.getElementById("saldo").value;

  const cuota = presupuesto / cantCuotas;

  const expediente = {
    cliente,
    materia,
    estado,
    fechaConfirmacion,
    situacion,
    presupuesto,
    comentarios,
    cuota,
    cantCuotas,
    numCuota,
    vencimiento,
    moneda,
    saldo,
  };

  expedientes.push(expediente);
  actualizarTabla();
  guardarExpedientes();

  document.getElementById("cliente").value = "";
  document.getElementById("materia").value = "";
  document.getElementById("estado").value = "judicial";
  document.getElementById("fechaConfirmacion").value = "";
  document.getElementById("situacion").value = "En tramite";
  document.getElementById("presupuesto").value = "";
  document.getElementById("comentarios").value = "";
  document.getElementById("cuota").value = "";
  document.getElementById("cantCuotas").value = "";
  document.getElementById("numCuota").value = "";
  document.getElementById("vencimiento").value = "";
  document.getElementById("moneda").value = "ARS";
  document.getElementById("saldo").value = "";
}

function actualizarTabla() {
  const tableBody = document.querySelector("#expedientesTable tbody");
  tableBody.innerHTML = "";

  expedientes.forEach((expediente, index) => {
    const row = tableBody.insertRow();
    const atrasoPago = calcularAtrasoPago(expediente.vencimiento);
    row.innerHTML = `
      <td>${expediente.cliente}</td>
      <td>${expediente.materia}</td>
      <td>${expediente.estado}</td>
      <td>${expediente.fechaConfirmacion}</td>
      <td>${expediente.situacion}</td>
      <td>${expediente.moneda ? expediente.moneda.toUpperCase() : ""}</td>
      <td>$${expediente.presupuesto}</td>
      <td>${expediente.comentarios}</td>
      <td>${
        typeof expediente.cuota === "number"
          ? `$${expediente.cuota.toFixed(2)}`
          : ""
      }</td>
      <td>${expediente.cantCuotas}</td>
      <td>${expediente.numCuota}</td>
      <td>${expediente.vencimiento}</td>
      <td>${atrasoPago}</td>
      <td>${expediente.saldo ? `$${expediente.saldo}` : ""}</td>
      <td>
        <button onclick="marcarFinalizado(${index})">Pago</button>
        <button onclick="editarExpediente(${index})">Editar</button>
        <button onclick="eliminarExpediente(${index})">Eliminar</button>
      </td>
    `;
  });
}

function marcarFinalizado(index) {
  const expediente = expedientes[index];

  if (expediente.situacion === "En tramite") {
    expediente.situacion = "Finalizado";
  } else if (expediente.situacion === "Finalizado") {
    expediente.situacion = "En tramite";
  }

  actualizarTabla();
  guardarExpedientes();
}

function editarExpediente(index) {
  const expediente = expedientes[index];

  document.getElementById("cliente").value = expediente.cliente;
  document.getElementById("materia").value = expediente.materia;
  document.getElementById("estado").value = expediente.estado;
  document.getElementById("fechaConfirmacion").value =
    expediente.fechaConfirmacion;
  document.getElementById("situacion").value = expediente.situacion;
  document.getElementById("moneda").value = expediente.moneda;
  document.getElementById("presupuesto").value = expediente.presupuesto;
  document.getElementById("comentarios").value = expediente.comentarios;
  document.getElementById("cuota").value = expediente.cuota;
  document.getElementById("cantCuotas").value = expediente.cantCuotas;
  document.getElementById("numCuota").value = expediente.numCuota;
  document.getElementById("vencimiento").value = expediente.vencimiento;
  document.getElementById("saldo").value = expediente.saldo;

  expedientes.splice(index, 1);
  guardarExpedientes();
  actualizarTabla();
}

function eliminarExpediente(index) {
  expedientes.splice(index, 1);
  actualizarTabla();
  guardarExpedientes();
}

function calcularAtrasoPago(fechaVencimiento) {
  const vencimiento = new Date(fechaVencimiento);
  const hoy = new Date();
  const diferenciaDias = Math.floor(
    (hoy - vencimiento) / (1000 * 60 * 60 * 24)
  );
  return diferenciaDias;
}

function guardarExpedientes() {
  const expedientesJSON = JSON.stringify(expedientes);

  localStorage.setItem("expedientes", expedientesJSON);

  console.log("Expedientes guardados correctamente.");
}

guardarExpedientes();

function cargarExpedientes() {
  const expedientesJSON = localStorage.getItem("expedientes");

  if (expedientesJSON) {
    expedientes = JSON.parse(expedientesJSON);
    actualizarTabla();
  }
}

cargarExpedientes();
