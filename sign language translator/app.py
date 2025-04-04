from flask import Flask, render_template, Response
from main import process_frame
import cv2 as cv

app = Flask(__name__)

def generate_frames():
    cap = cv.VideoCapture(0)  # OpenCV video capture

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        processed_frame = process_frame(frame)  # Process the frame using your main function

        ret, buffer = cv.imencode('.jpg', processed_frame)
        if not ret:
            continue

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

    cap.release()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
