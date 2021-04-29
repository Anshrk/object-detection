export const drawRect = ( detections, ctx ) => {
    detections.forEach(prediction => {
        const [x, y, width, height] = prediction['bbox'];
        const text = prediction['class'];

        // styling the lines and font
        const color = '#' + Math.floor(Math.random()*16777215).toString(16);
        ctx.lineWidth = 5;
        ctx.strokeStyle = color;
        ctx.font = '30px Arial';
        ctx.fillStyle = color;
        

        // drawing the line
        ctx.beginPath()
        ctx.fillText(text, x, y)
        ctx.rect(x, y, width, height)
        ctx.stroke()
        
    });
};