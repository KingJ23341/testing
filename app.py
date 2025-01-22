from flask import Flask, request, jsonify
from collections import defaultdict

app = Flask(__name__)

# Simple n-gram model storage
model = defaultdict(lambda: defaultdict(int))

@app.route('/train', methods=['POST'])
def train():
    data = request.get_json()
    sentence = data.get('sentence', '')
    words = sentence.split()
    for i in range(len(words) - 1):
        model[words[i]][words[i + 1]] += 1
    return jsonify({"status": "success"})

@app.route('/predict', methods=['GET'])
def predict():
    prefix = request.args.get('prefix', '')
    words = prefix.split()
    if not words:
        return jsonify({"prediction": ""})

    last_word = words[-1]
    next_words = model[last_word]
    if not next_words:
        return jsonify({"prediction": ""})

    # Get the most frequent next word
    prediction = max(next_words, key=next_words.get)
    return jsonify({"prediction": prediction})

if __name__ == '__main__':
    app.run(debug=True)
