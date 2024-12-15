from config import db, bcrypt 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

class Profile(db.Model, SerializerMixin):
    __tablename__ = "profile"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    profile_bio = db.Column(db.String, nullable=False)
    employed = db.Column(db.Boolean, nullable=False)
    open_to_work = db.Column(db.Boolean, nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    home_country = db.Column(db.String, nullable=False)
    home_town = db.Column(db.String, nullable=False)
    current_country = db.Column(db.String, nullable=False)
    current_town = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    git_hub_link = db.Column(db.String, nullable=False, server_default="")
    linkdn_link = db.Column(db.String, nullable=False, server_default="")
    insta_link = db.Column(db.String, nullable=False, server_default="")


    #Password hashing and authentication
    @hybrid_property
    def password_hash(self):
        raise AttributeError("password: write-only attribute")
    
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    
    #Add validation for emails
    @validates("email")
    def validate_email(self, key, value):
        if "@" not in value:
            raise ValueError("Please enter a valid email address")
        return value


class Institute(db.Model, SerializerMixin):
    __tablename__ = "institutes"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    logo = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)

    #Add relations
    projects = db.relationship("Projects", backref = "institutes")

    #Add seriealize rules
    serialize_rules = (
        "-projects",
    )


class Languages(db.Model, SerializerMixin):
    __tablename__ = "languages"

    id=db.Column(db.Integer, primary_key=True)
    logo = db.Column(db.String, nullable=True)
    name = db.Column(db.String, nullable=False)
    experience = db.Column(db.Integer, nullable=False)

    #Add relations 
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"))
    project_language = db.relationship("ProjectLanguages", backref="languages", cascade="all, delete-orphan")

    #Add serialize rules
    serialize_rules = (
        "-projects",
        "-project_language",
        "-project_id",
    )


class Projects(db.Model, SerializerMixin):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    git_hub_link = db.Column(db.String, nullable=True)
    blog_link = db.Column(db.String, nullable=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

    # Set up relations with cascade delete
    institute_id = db.Column(db.Integer, db.ForeignKey("institutes.id"))
    points = db.relationship("ProjectPoints", backref="projects", cascade="all, delete-orphan")
    project_language = db.relationship("ProjectLanguages", backref="projects", cascade="all, delete-orphan")

    # Add serialize rules
    serialize_rules = (
        "-institutes.projects",
        "-points.projects",
    )


class ProjectPoints(db.Model, SerializerMixin):
    __tablename__ = "projectPoints"

    id = db.Column(db.Integer, primary_key=True)
    point = db.Column(db.String, nullable=False)

    #Set up relations
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"))

    #Add serialize rules
    serialize_rules = (
        "-projects",
    )

class Emails(db.Model, SerializerMixin):
    __tablename__ = "emails"

    id = db.Column(db.Integer, primary_key=True)
    recipient = db.Column(db.String, nullable=False)
    sender_name = db.Column(db.String, nullable=False)
    sender_company = db.Column(db.String, nullable=False)
    subject = db.Column(db.String, nullable=False)
    message = db.Column(db.String, nullable=False)

class ProjectLanguages(db.Model, SerializerMixin):
    __tablename__ = "project_languages"

    id = db.Column(db.Integer, primary_key=True)

    language_id = db.Column(db.ForeignKey("languages.id"), nullable=False)
    project_id = db.Column(db.ForeignKey("projects.id"), nullable=False)

    serialize_rules = (
        "-languages.project_language",
        "-project_language.project_id",
        "-project_language.language_id",
        "-projects",
    )