import { jsPDF } from "jspdf";


function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const res = event.target.result;
                resolve(res)
            }
            const file = this.response;
            reader.readAsDataURL(file)
        }
        xhr.send();
    })
}


window.addEventListener("load", async () => {
    const form = document.querySelector("#form");
    form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const agencia = document.querySelector('#agencia').value;
        const despacho = document.querySelector('#despacho').value;
        const imo = document.querySelector('#imo').value;
        const buque = document.querySelector('#buque').value;
        const bandera = document.querySelector('#bandera').value;
        const eslora = document.querySelector('#eslora').value;
        const manga = document.querySelector('#manga').value;
        const puntal = document.querySelector('#puntal').value;
        const coe = document.querySelector('#coe').value;
        const cproa = document.querySelector('#caladoproa').value
        const cpopa = document.querySelector('#caladopopa').value
        const desde = document.querySelector('#desde').value
        const hasta = document.querySelector('#hasta').value
        const canal = document.querySelector('#canal').value
        const buquename = document.querySelector('#nombrebuque').value;
        const matricula = document.querySelector('#matricula').value
        const observaciones = document.querySelector('#observaciones').value;
        const fechapre = document.querySelector('#fechapre').value;
        const presentacion = document.querySelector('#presentacion').value;
        const fechainicio = document.querySelector('#fechainicio').value;
        const inicio = document.querySelector('#inicio').value;
        const fechafin = document.querySelector('#fechafin').value;
        const final = document.querySelector('#final').value;
        const fechalancha = document.querySelector('#fechalancha').value;
        const lancha = document.querySelector('#lancha').value;
        const fechatierra = document.querySelector('#fechatierra').value;
        const tierra = document.querySelector('#tierra').value


        generarPDF( buque, bandera,agencia, despacho, imo,
            eslora, manga , puntal, coe, cproa, cpopa, desde,
            hasta, canal, buquename, matricula, observaciones,
            fechapre, presentacion, fechainicio, inicio, fechafin, final,
            fechalancha, lancha, fechatierra, tierra 
        )

    });








    const canvas = document.querySelector("#canvass");
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
    signature = new SignaturePad(canvas, {});
    //segunda firma ....
    const canvasdos = document.querySelector('#canvassdos')
    canvasdos.height = canvas.offsetHeight;
    canvasdos.width = canvas.offsetWidth;
    signaturedos = new SignaturePad(canvasdos, {})

    const image = await loadImage('/reciboco.jpg')
    //console.log(image)
});
 let signature = null
 let signaturedos = null

async function generarPDF(buque, bandera,agencia, despacho,
    imo, eslora, manga, puntal, coe, cproa, cpopa, desde, hasta, 
    canal, buquename, matricula, observaciones, fechapre, presentacion,
    fechainicio, inicio, fechafin, final, fechalancha, lancha, fechatierra, tierra ) 
    {
    const image = await loadImage('/reciboco.jpg');
    const signatureIma = signature.toDataURL();
    const signatureImados = signaturedos.toDataURL();

    const doc = new jsPDF('p', 'pt', 'letter');
    doc.addImage(image, 'PNG', 0, 0, 610, 792);
    doc.addImage(signatureIma, 'PNG', 400,650, 250, 80);
    doc.addImage(signatureImados, 'PNG', 110, 620, 250, 80);
    doc.setFontSize(12);
    doc.text(agencia, 190, 140);
    doc.text(despacho, 480, 145);
     doc.text(imo, 475, 260)
    doc.text(buque, 110, 216)
    //fechas y horarios
    doc.text(fechapre, 108, 165)
    doc.text(presentacion, 110, 187)
    doc.text(fechainicio, 208, 165)
    doc.text(inicio, 209, 187)
    doc.text(fechafin, 313, 165)
    doc.text(final, 315, 187)
    doc.text(fechalancha, 428, 165)
    doc.text(lancha, 429, 187)
    doc.text(fechatierra, 545, 165)
    doc.text(tierra, 546, 187)
    //fin horarios
    doc.text(bandera, 110, 260)
    doc.text(eslora, 80, 291)
    doc.text(manga,200, 291)
    doc.text(puntal,330, 291)
    doc.text(coe, 510, 291)
    doc.text(cproa, 113, 323)
    doc.text(cpopa, 113, 362)
    doc.text(desde, 200, 323)
    doc.text(hasta,200, 362)
    doc.text(canal, 458, 323)
    doc.text(observaciones, 125, 490)
    doc.setFontSize(17);
    doc.text(buquename, 310, 630)
    doc.text(matricula, 330, 650)


    doc.save("Boleta.pdf");
}

