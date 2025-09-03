from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

TELEGRAM_BOT_TOKEN = "***REMOVED***"
CHAT_ID = "-1002914801516"  # Add your chat ID here

@app.route('/submit-form', methods=['POST'])
def submit_form():
    try:
        data = request.json
        
        # Format the message
        message = f"""
🤝 Новая заявка на сотрудничество

👤 Имя: {data.get('name', 'Не указано')}
🏢 Компания: {data.get('company', 'Не указана')}
🎯 Услуга: {data.get('service', 'Не указана')}
📱 Телефон: {data.get('phone', 'Не указан')}
📧 Email: {data.get('email', 'Не указан')}
        """
        
        # Send to Telegram
        telegram_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        telegram_data = {
            'chat_id': CHAT_ID,
            'text': message,
            'parse_mode': 'HTML'
        }
        
        response = requests.post(telegram_url, json=telegram_data)
        
        if response.status_code == 200:
            return jsonify({'success': True, 'message': 'Form submitted successfully'})
        else:
            return jsonify({'success': False, 'message': 'Failed to send message'}), 500
            
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)