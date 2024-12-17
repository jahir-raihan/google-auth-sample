# Test projects for integration guide on Google Authentication

### Frontend setup


**For now I've added my google client id to test it out, don't make it public**
```bash
cd test_app && npm install && npm run dev
```

### Backend Setup

**For now I've added my google client id to test it out, don't make it public**

```bash
cd testing_auth
```
**Create virtual env and activate**
```bash
python3 -m venv venv
source ./venv/bin/activate
```
**Install requirements**
```bash
pip install -r requirements.txt
```
**Migrate**
```bash
python manage.py makemigrations
python manage.py migrate
```
**Create superuser**
```bash
python manage.py createsuperuser
```

**Run it**
```bash
python manage.py runserver
```

**Now start frontend using `npm run dev` and sign in with your google account, then see if user get's added in django admin panel**