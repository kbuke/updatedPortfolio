from flask import request, make_response, session, render_template, send_from_directory

from config import app, db, api, os

from models import Profile, Languages, Institute, Projects, ProjectPoints, Emails, ProjectLanguages

from flask_restful import Resource 

import smtplib 

from email.mime.text import MIMEText

from datetime import datetime

import os

from dotenv import load_dotenv
load_dotenv()

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):
    if path and os.path.exists(f"../client/build/{path}"):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


class Profiles(Resource):
    def get(self):
        profiles = [profile.to_dict() for profile in Profile.query.all()]
        return profiles, 200
    

class ProfilesId(Resource):
    def get(self, id):
        user_info = Profile.query.filter(Profile.id==id).first()
        if user_info:
            return make_response(user_info.to_dict(), 201)
        return {
            "error": "user not found"
        }, 404
    
    def patch(self, id):
        data = request.get_json()
        user_info = Profile.query.filter(Profile.id == id).first()

        if user_info:
            try:
                # Handle password hashing separately
                if '_password_hash' in data:
                    user_info.password_hash = data.pop('_password_hash')  # Use the setter to hash the password

                # Set other attributes
                for attr, value in data.items():
                    setattr(user_info, attr, value)

                db.session.commit()

                return make_response(user_info.to_dict(), 202)
            except ValueError:
                return {
                    "error": ["Validation Error"]
                }, 400
        return {
            "error": "Profile not found"
        }, 404

class Technologies(Resource):
    def get(self):
        languages = [language.to_dict() for language in Languages.query.all()]
        return languages

    def post(self):
        json = request.get_json()
        try:
            new_stack = Languages(
                logo = json.get("stackLogo"),
                name = json.get("stackName"),
                experience = json.get("stackExperience")
            )
            db.session.add(new_stack)
            db.session.commit()
            return new_stack.to_dict(), 201
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

class TechnologiesId(Resource):
    def get(self, id):
        stack_info = Languages.query.filter(Languages.id==id).first()
        if stack_info:
            return make_response(stack_info.to_dict(), 201)
        return {'error': "Stack not found"}
    
    def patch(self, id):
        data = request.get_json()
        stack_info = Languages.query.filter(Languages.id==id).first()

        if stack_info:
            try:
                for attr, value in data.items():
                    setattr(stack_info, attr, value)
                db.session.commit()

                return make_response(stack_info.to_dict(), 202)
            except ValueError:
                return{
                    "error": ["Validation Error"]
                }, 404 
        return {
            "error": "Stack not found"
        }, 404

    
    def delete(self, id):
        stack_info = Languages.query.filter(Languages.id==id).first()
        if stack_info:
            db.session.delete(stack_info)
            db.session.commit()
            return{
                "message": "Stack deleted"
            }, 200 
        return{
            "error": "Stack not found"
        }, 404

class Institutes(Resource):
    def get(self):
        institutes = [institute.to_dict() for institute in Institute.query.all()]
        return institutes
    
    def post(self):
        json = request.get_json()
        try:
            new_institute = Institute(
                name = json.get("instituteName"),
                logo = json.get("instituteLogo"),
                location = json.get("instituteLocation")
            )
            db.session.add(new_institute)
            db.session.commit()
            return new_institute.to_dict(), 201 
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

class InstituteId(Resource):
    def get(self, id):
        institute_info = Institute.query.filter(Institute.id==id).first()
        if institute_info:
            return make_response(institute_info.to_dict(), 201)
        return{
            "error": "Institute not found"
        }, 404
    
    def delete(self, id):
        institute_info = Institute.query.filter(Institute.id==id).first()
        if institute_info:
            db.session.delete(institute_info)
            db.session.commit()
            return{
                "message": "Institute deleted"
            }, 200 
        return {
            "error": "Institute not found"
        }, 404

class Project(Resource):
    def get(self):
        projects = [project.to_dict() for project in Projects.query.all()]
        return projects

    def post(self):
        json = request.get_json()
        try:
            # Convert dates to date format
            start_date = datetime.strptime(json.get("startDate"), "%Y-%m-%d").date() if json.get("startDate") else None
            end_date = datetime.strptime(json.get("endDate"), "%Y-%m-%d").date() if json.get("endDate") else None
            
            # Convert institute_id to integer
            institute_id = int(json.get("instituteId")) if json.get("instituteId") else None
            
            new_project = Projects(
                image = json.get("newImg"),
                name = json.get("newName"),
                git_hub_link = json.get("gitLink"),
                web_link = json.get("webLink"),
                blog_link = json.get("blogLink"),
                start_date = start_date,
                end_date = end_date,
                institute_id = institute_id
            )
            db.session.add(new_project)
            db.session.commit()
            return new_project.to_dict(), 201
        except ValueError as e:
            return {
                "error": [str(e)]
            }, 400

class ProjectId(Resource):
    def get(self, id):
        project_info = Projects.query.filter(Projects.id==id).first()
        if project_info:
            return make_response(project_info.to_dict(), 201)
        return {"error": "Project not found"}
    
    def patch(self, id):
        data = request.get_json()
        project_info = Projects.query.filter(Projects.id==id).first()

        if project_info:
            try:
                if "start_date" in data:
                    try:
                        data["start_date"] = datetime.strptime(data["start_date"], "%Y-%m-%d").date()
                    except ValueError:
                        return {"error": "Invalid start_date format"}, 400
                
                if "end_date" in data:
                    try:
                        data["end_date"] = datetime.strptime(data["end_date"], "%Y-%m-%d").date()
                    except ValueError:
                        return{"error": "Invalid end_date format"}, 400

                for attr, value in data.items():
                    setattr(project_info, attr, value)
                db.session.commit()

                return make_response(project_info.to_dict(), 202)
            except ValueError:
                return {
                    "error": ["Validation Error"]
                }, 404 
        return {
            "error": "Project not found"
        }, 404
    
    def delete(self, id):
        project_info = Projects.query.filter(Projects.id==id).first()
        if project_info:
            db.session.delete(project_info)
            db.session.commit()
            return{
                "message": "Project deleted"
            }, 200
        return{
            "error": "Project not found"
        }, 404

class Points(Resource):
    def get(self):
        points = [point.to_dict() for point in ProjectPoints.query.all()]
        return points 
    
    def post(self):
        json=request.get_json()
        try:
            new_point = ProjectPoints(
                point = json.get("newProjectPoint"),
                project_id = json.get("projectId")
            )
            db.session.add(new_point)
            db.session.commit()
            return new_point.to_dict(), 201 
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

class PointsId(Resource):
    def get(self, id):
        points_info = ProjectPoints.query.filter(ProjectPoints.id==id).first()
        if points_info:
            return make_response(points_info.to_dict(), 201)
        return {"error": "Point not found"}
    
    def patch(self, id):
        data = request.get_json()
        points_info = ProjectPoints.query.filter(ProjectPoints.id==id).first()

        if points_info:
            try:
                for attr, value, in data.items():
                    setattr(points_info, attr, value)
                db.session.commit()

                return make_response(points_info.to_dict(), 202)
            except ValueError:
                return {
                    "error": ["Validation Error"]
                }, 404 
        return{
            "error": "Point not found"
        }, 404 
    
    def delete(self, id):
        points_info = ProjectPoints.query.filter(ProjectPoints.id==id).first()
        if points_info:
            db.session.delete(points_info)
            db.session.commit()
            return{
                "message": "Point deleted"
            }, 200
        return{
            "error": "Point not found"
        }, 404

class ProjectLanguage(Resource):
    def get(self):
        project_tech = [tech.to_dict() for tech in ProjectLanguages.query.all()]
        return project_tech

    def post(self):
        json = request.get_json()
        try:
            new_combo = ProjectLanguages(
                language_id = json.get("stackId"),
                project_id = json.get("projectId")
            )
            db.session.add(new_combo)
            db.session.commit()
            return new_combo.to_dict(), 201 
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

class Login(Resource):
    def post(self):
        json = request.get_json()
        email = json.get("email").strip()
        password = json.get("password")

        print(f"Login attempt: email={email}, password={'*' * len(password)}")

        if not email or not password:
            return {"error": "Email and Password required"}, 400

        user = Profile.query.filter(Profile.email == email).first()
        print(f"Queried user: {user}")

        if user and user.authenticate(password):
            session["user_id"] = user.id
            print(f"Session set: {session}")
            return user.to_dict(), 200

        return {"error": "Invalid email or password"}, 401


class Logout(Resource):
    def delete(self):
        print(f"Session before logout: {session}")
        user_id = session.get("user_id")
        if user_id:
            session.pop("user_id")
            print("User logged out successfully")
            return {}, 204
        print("Unauthorized logout attempt")
        return {"message": "Unauthorized"}, 401


class CheckSession(Resource):
    def get(self):
        print(f"Session during CheckSession: {session}")
        user_id = session.get("user_id")
        if user_id:
            user = Profile.query.filter(Profile.id == user_id).first()
            if user:
                return user.to_dict(), 200
        return {"message": "Unauthorized user"}, 401



class Email(Resource):
    def get(self):
        emails = [email.to_dict() for email in Emails.query.all()]
        return emails
    
    def post(self):
        json = request.get_json()


        # Extract the email details from the request body
        recipient = json.get("userEmail")  # Your email (where the message is sent)
        sender_name = json.get("respondAddress")  # The sender's email (provided by the user)
        sender_company = json.get("senderCompany")
        subject = json.get("emailSubject")
        message = json.get("emailMessage")

        try:
            # Save email details to database
            new_email = Emails(
                recipient=recipient,
                sender_name=sender_name,
                sender_company=sender_company,
                subject=subject,
                message=message  
            )
            db.session.add(new_email)
            db.session.commit()

            # SMTP server configuration
            smtp_server = "smtp.gmail.com"
            smtp_port = 587
            sender_email = os.environ.get("email")  
            sender_password = os.environ.get("google_password")

            

            # Construct the email message
            msg = MIMEText(f"From: {sender_name}\nCompany: {sender_company}\n\nMessage:\n{message}")
            msg["Subject"] = subject
            msg["From"] = sender_email  # The sender (you)
            msg["To"] = recipient  # The recipient (you)

            # Send the email via Gmail SMTP
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()  # Secure the connection
                server.login(sender_email, sender_password)
                server.sendmail(sender_email, recipient, msg.as_string())

            return {"message": "Email sent successfully"}, 201

        except smtplib.SMTPException as smtp_error:
            return {"error": "Failed to send email: " + str(smtp_error)}, 500

api.add_resource(Profiles, '/profile')
api.add_resource(ProfilesId, '/profiles/<int:id>')

api.add_resource(Technologies, '/technologies')
api.add_resource(TechnologiesId, '/technologies/<int:id>')

api.add_resource(Institutes, '/institutes')
api.add_resource(InstituteId, '/institutes/<int:id>')

api.add_resource(Project, '/projects')
api.add_resource(ProjectId, '/projects/<int:id>')

api.add_resource(Points, '/points')
api.add_resource(PointsId, '/points/<int:id>')

api.add_resource(Email, '/emails')
api.add_resource(ProjectLanguage, '/projecttech')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')



if __name__ == "__main__":
    app.run(port=5555, debug=True)