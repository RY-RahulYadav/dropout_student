import pandas as pd
import requests
import numpy as np
from flask import Flask, jsonify, request
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.metrics import classification_report, accuracy_score
from tensorflow.keras.models import Sequential , load_model
from tensorflow.keras.layers import Dense , Dropout
from tensorflow.keras.utils import to_categorical

app = Flask(__name__)

def update_csv(csv_file_path, api_url):
    # Fetch student data from API
    response = requests.get(api_url)
    new_data = response.json()
    # print(new_data)
    
    # Load existing CSV file or create an empty DataFrame if it doesn't exist
    try:
        df_existing = pd.read_csv(csv_file_path)
        print(df_existing)
    except FileNotFoundError:
        df_existing = pd.DataFrame()
    
    # Convert new data to DataFrame
    df_new = pd.DataFrame(new_data)
    
    # Select only the required columns
    required_columns = [
        'attendance', 'behaviorRating', 'classX', 'classXII', 
        'gratution', 'healthissue', 'familyincome', 'previousFee',
        'backlogs', 'gender', 'educationLoan', 'isdropout'
    ]
    
    # Ensure all required columns are present and fill missing columns with NaN
    for column in required_columns:
        if column not in df_new.columns:
            df_new[column] = None
    
    df_new = df_new[required_columns]
    
    # Append new data to the bottom of the existing CSV data
    df_updated = pd.concat([df_existing, df_new], ignore_index=True)
    
    # Remove equal number of records from the top to maintain the same count
    num_to_remove = len(df_new)
    df_final = df_updated.iloc[num_to_remove:].reset_index(drop=True)
    
    # Save the updated CSV file
    df_final.to_csv(csv_file_path, index=False)



def train_ann(csv_file_path):
  
    data = pd.read_csv(csv_file_path)

    label_encoders = {}
    for column in ['HealthIssues', 'PreviousFee', 'Gender', 'EducationLoan', 'IsDropout']:
        label_encoders[column] = LabelEncoder()
        data[column] = label_encoders[column].fit_transform(data[column])

    X = data.drop('IsDropout', axis=1)
    y = data['IsDropout']

    y = to_categorical(y)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    model = Sequential()
    model.add(Dense(64, input_dim=X_train.shape[1], activation='relu'))
    Dropout(0.5)
    model.add(Dense(32, activation='relu'))
    Dropout(0.5)
    model.add(Dense(y_train.shape[1], activation='softmax'))  # Output layer

    
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

   
    history = model.fit(X_train, y_train, epochs=60 , batch_size=100, validation_split=0.3, verbose=1)

   
    y_pred = model.predict(X_test)
    y_pred_classes = np.argmax(y_pred, axis=1)
    y_test_classes = np.argmax(y_test, axis=1)

    print("Neural Network Accuracy:", accuracy_score(y_test_classes, y_pred_classes))
    print(classification_report(y_test_classes, y_pred_classes))

    
    model.save('student_ann_model.h5')

@app.route('/train', methods=['GET'])
def train():
    csv_file_path = 'students_dataset.csv'
    train_ann(csv_file_path)
    return jsonify({"message": "Model trained successfully!"})


@app.route('/mlpredict', methods=['POST'])
def predict():
    model = load_model('student_ann_model.h5')
    data = request.get_json()
    
    # Extract features from the input data
    features = []
    for student in data:
        features.append([
            student.get('attendance', 0),
            student.get('behaviorRating', 0),
            student.get('classX', 0),
            student.get('classXII', 0),
            student.get('gratution', 0),
            student.get('healthissue', 1),
            student.get('familyincome', 0),
            student.get('previousFee', 0),
            student.get('backlogs', 0),
            student.get('gender', 0),
            student.get('educationLoan', 0)
        ])
    
    features = np.array(features)
    print(features)
    
    # Apply the same scaling as during training
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(features)
    
    # Predict dropout chances
    predictions = model.predict(scaled_features)
    predicted_classes = np.argmax(predictions, axis=1)
    print(predicted_classes)
    # Return predictions
    return jsonify({'predictions': predicted_classes.tolist()})


@app.route('/update_and_train', methods=['GET'])
def update_and_train():
    # Fetch API URL from request
    api_url = "http://localhost:3000/api/student/getall"
    csv_file_path = 'drop_student.xls'
    
    # Update CSV file
    update_csv(csv_file_path, api_url)
    
    # Train ANN
    train_ann(csv_file_path)
    
    return jsonify({"message": "CSV updated and model trained successfully!"})

if __name__ == '__main__':
    app.run(debug=True)
