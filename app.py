import os
from flask import Flask,render_template,jsonify
from flask_cors import CORS


app = Flask(__name__)


# Enable CORS on all routes
CORS(app)

@app.route('/')
def index():
     navcontent = [
        ["Home", []],
        ["About Us", ["Navrachana Education Society", "Leadership", "Governance", "Infrastructure", "Office of the Registrar", "Accreditations", "Resources", "Annual Report", "Contact Us"]],
        ["School", ["School of Business and Law", "School of Engineering and Technology", "School of Science", "School of Environmental Design and Architecture", "School of Liberal Studies and Education"]],
        ["Program", ["BBA", "BBA-LLB", "MBA", "Executive MBA", "LLM", "BTech CSE", "BTech Civil", "BTech Mechanical", "BTech EEE", "MTech (TE/PSE/SE/CSE)", "BCA", "BSc-Data Science", "BSc", "Integrated BSc-MSc Biomedical Science", "MSc-Chemistry", "MSc-Life Sciences", "MSc-Microbiology", "MSc-Clinical Embryology", "BDesign (Interior)", "BDesign (Product & Visual Comm)", "BArch", "BA-Journalism and Mass Communication", "BA-Humanities and Social Sciences", "BEd", "PhD (SBL/SoS/SLSE/SET)"]],
        ["Beyond Books", ["Khoj", "Choice-based Curriculum", "Minor Disciplines", "Alumni Connect", "Sports", "Arts & Culture", "Technical Events", "Students Club", "International Cell", "Blogs", "Podcast"]],
        ["Research", ["Research Hub", "Interwoven", "Research Centers", "Projects", "Publications"]],
        ["Admission", ["Apply Now", "Why Navrachana", "Fee Structure", "Intake", "Scholarship", "Placements", "Hostel", "Campus Tour", "Prospectus"]],
        ["Students Corner", ["Academic Calendar", "Holiday List", "Examination", "Resources", "Policies & Guidelines", "Notifications", "Directory", "Student Startup & Incubation"]]
    ]
     
     return render_template('index.html',navbar_content=navcontent)


@app.route('/images-array')
def image():
     # Path to the image folder
     image_folder = os.path.join(app.static_folder, 'images/logos')
     
     # List of image filenames
     images = [f for f in os.listdir(image_folder) if f.endswith(('png', 'jpg', 'jpeg', 'gif'))]

     return jsonify({'images':images})

@app.route('/charts_data')
def get_charts_data():
    charts = [
        ["No. of Companies",{
             "2017-2018":50,
             "2018-2019":97,
             "2019-2020":87,
             "2020-2021":85,
             "2021-2022":162,
             "2022-2023":260
        }],
        ["Placed Students Year Wise",{
             "2017-2018":76,
             "2018-2019":103,
             "2019-2020":135,
             "2020-2021":124,
             "2021-2022":161,
             "2022-2023":221
        }],
        ["Compensation Average (LPA)",{
             "2017-2018":2.53,
             "2018-2019":2.56,
             "2019-2020":2.57,
             "2020-2021":2.26,
             "2021-2022":2.7,
             "2022-2023":3.25
        }],
        ["Compensation Max (LPA)",{
             "2017-2018":10,
             "2018-2019":10,
             "2019-2020":12,
             "2020-2021":6.4,
             "2021-2022":7,
             "2022-2023":34.6,
        }]
    ]
    return jsonify(charts)

@app.route('/cdc-team')
def get_cdc_team_data():
     
     # Getting The Below Data From Backend
     cdc_team = {
          "member1":{
               "name":"Milind Ruparel",
               "position":"Head - Career Development Center",
               "phone":"0265 2617282",
               "email":"placement@nuv.ac.in",
               "img":"milind.jpg"
               },
          "member2":{
               "name":"Vaibhavi Choughule",
               "position":"Executive - Career Development Center",
               "phone":"0265 2617283",
               "email":"vaibhavi.choughule@nuv.ac.in",
               "img":"vaibhavi.jpg"
               },
          "member3":{
               "name":"Sonali Patel",
               "position":"Assistant - Career Development Center",
               "phone":"0265 2617283",
               "email":"sonali.patel@nuv.ac.in",
               "img":"sonali.jpg"
               },
     }
     
     return jsonify(cdc_team)

@app.route("/activities")
def get_activities_data():

     activities = {
          "activity1":{"title":"MOU with MG Nurture for Skill Development","img":"img1.jpg"},
          "activity2":{"title":"Expert Talk by Haver & Boecker","img":"img2.jpg"},
          "activity3":{"title":"Mock Interviews","img":"img3.jpg"},
          "activity4":{"title":"Seminar on Career Opportunity with Infosys","img":"img4.jpg"},
          "activity5":{"title":"Odysseus Solutions Expert Session","img":"img5.jpg"},
          "activity6":{"title":"Placement Orientation Session","img":"img6.jpg"},
     }

     return jsonify(activities)


if __name__ == "__main__":
    app.run(host="127.0.0.1",debug=True)