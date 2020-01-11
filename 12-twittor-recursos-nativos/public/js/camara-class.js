/**
 * @class Clase que controla la camara
 */
class Camara {

    /**
     * Constructor del controlador de la camara
     * @param {videoNode} Nombre del objeto que controla el video
     */
    constructor(videoNode) {
        this.videNode = videoNode;
        console.log('Camara Class init');
    }

    /**
     * Enciende la camara
     */
    encender() {

        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: { width: 300, height: 300 }
            }).then(stream => {
                this.videNode.srcObject = stream;
                this.stream = stream;
            });
        }

    }

    apagar() {
        if (this.stream) {
            this.stream.getTracks()[0].stop();
        }
    }

    /**
     * Toma la fotografia y la posiciona en el modal
     */
    tomarFoto() {

        //Crear un elemento canvas para renderizar la foto
        let canvas = document.createElement('canvas');

        //Colocar las dimensiones igual al elemento del video
        canvas.setAttribute('width', 300);
        canvas.setAttribute('heigth', 300);

        //Obtener el contexto del canvas
        let context = canvas.getContext('2d');

        context.drawImage(this.videNode, 0, 0, canvas.width, canvas.height);

        //Guarda la foto
        this.foto = context.canvas.toDataURL();

        //Limpieza
        canvas = null;
        context = null;

        return this.foto;
    }
}