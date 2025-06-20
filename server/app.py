from flask import Flask,jsonify
import numpy as np
import cv2
from keras.models import load_model
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1

info = {}

# haarcascade = "haarcascade_frontalface_default.xml"
haarcascade = "haarcascade_frontalface_alt2.xml"
label_map = ['Anger', 'Neutral', 'Fear', 'Happy', 'Sad', 'Surprise']
print("+"*50, "loadin gmmodel")
model = load_model(r"model.h5")
cascade = cv2.CascadeClassifier(haarcascade)

@app.route('/emotion_detect', methods=["POST"])
def emotion_detect():
	
	found = False 

	cap = cv2.VideoCapture(0)
	while not(found):
		_, frm = cap.read()
  
		timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
		image_filename = f"yourpic_{timestamp}.jpg"
		cv2.imwrite(os.path.join("static/img", image_filename), frm)
  
		gray = cv2.cvtColor(frm,cv2.COLOR_BGR2GRAY)

		faces = cascade.detectMultiScale(gray, 1.4, 1)

		for x,y,w,h in faces:
			found = True
			roi = gray[y:y+h, x:x+w]
			cv2.imwrite("static/face.jpg", roi)

	roi = cv2.resize(roi, (48,48))

	roi = roi/255.0
	
	roi = np.reshape(roi, (1,48,48,1))

	prediction = model.predict(roi)

	print(prediction)
	
	prediction = np.argmax(prediction)
	prediction = label_map[prediction]

	cap.release()
	link = f"http://127.0.0.1:5000/static/img/{image_filename}"
	return jsonify({'result': prediction,'link':link})
	

if __name__ == "__main__":
	
	# CORS(app, origins="http://localhost:5173")  #Frontend server linked 
	app.run(debug=True)
 