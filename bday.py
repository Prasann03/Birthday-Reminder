from app import app
from app import db, app

if __name__ == "__main__":
    app.run(debug=True)

with app.app_context():
    db.create_all()

