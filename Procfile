web: gunicorn config.wsgi:application
worker: celery worker --app=react_django_users.taskapp --loglevel=info
