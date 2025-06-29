from flask import render_template, flash, redirect, url_for, request
from app import app, mail
from app.forms import LoginForm
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, db
from config import Config
from werkzeug.security import generate_password_hash
from flask_mail import Message

@app.route('/')
@app.route('/index')
def index():  # ✅ Public route
    print("Current user:", current_user)
    return render_template("index.html")

@app.route('/init-db')
def init_db():
    db.create_all()

    # Check if admin user already exists
    existing = User.query.filter_by(username='admin').first()
    if not existing:
        admin = User(username='admin', password_hash=generate_password_hash('admin123'))
        db.session.add(admin)
    else:
      existing.password_hash = generate_password_hash('admin123')

    db.session.commit()

    return 'Database initialized and admin user created.'
    return 'Admin user already exists.'


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if current_user.is_authenticated:
        return redirect(url_for('main'))

    if request.method == 'POST':
        print("Form POST received")
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.check_password(form.password.data):
            login_user(user)
            print("Login successful")
            return redirect(url_for('main'))
        else:
            flash("Invalid credentials")
            print("Login failed")

    return render_template("login.html", form=form)



@app.route('/main')
@login_required  # ✅ Protected route
def main():
    photo_data = [
        {"img": "mix1.jpg", "caption": "Photographer Mix", "desc": "You make life more creative."},
        {"img": "mix2.jpg", "caption": "Sleeping Mix", "desc": "May all your dreams be sweet."},
        {"img": "mix3.jpg", "caption": "Model Mix", "desc": "You shine brighter than any lens could capture."},
        # ... add the rest
    ]
    return render_template("main.html", photos=photo_data)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))


@app.route('/sendMail')
@login_required
def sendMail():
    msg = Message('Hello', sender=Config.MAIL_USERNAME, recipients=[Config.MAIL_RECEIVER])
    msg.body = "Mail content"
    mail.send(msg)
    return ('', 204)


