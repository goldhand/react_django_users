React Django Users
==============================

Basic user app for a react django project

.. image:: https://img.shields.io/badge/built%20with-Cookiecutter%20Django-ff69b4.svg
     :target: https://github.com/pydanny/cookiecutter-django/
     :alt: Built with Cookiecutter Django


LICENSE: MIT


Settings
------------

Moved to settings_.

.. _settings: http://cookiecutter-django.readthedocs.io/en/latest/settings.html

Basic Commands
--------------

Setting Up Your Users
^^^^^^^^^^^^^^^^^^^^^

* To create a **normal user account**, just go to Sign Up and fill out the form. Once you submit it, you'll see a "Verify Your E-mail Address" page. Go to your console to see a simulated email verification message. Copy the link into your browser. Now the user's email should be verified and ready to go.

* To create an **superuser account**, use this command::

    $ python manage.py createsuperuser

For convenience, you can keep your normal user logged in on Chrome and your superuser logged in on Firefox (or similar), so that you can see how the site behaves for both kinds of users.

Test coverage
^^^^^^^^^^^^^

To run the tests, check your test coverage, and generate an HTML coverage report::

    $ coverage run manage.py test
    $ coverage html
    $ open htmlcov/index.html

Running tests with py.test
~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

  $ py.test


Running javascript tests with karma
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

  $ npm test


Hot reloading with React and Webpack
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install npm depenencies::

  $ npm install

Start the development server::

  $ npm start


A more detailed explanation for `Developing locally with webpack`_


The `static project readme`_ contains a lot of information about React / Redux and Webpack for this project.

.. _`static project readme`: react_django_users/static/react_django_users/README.md
.. _`Developing locally with webpack`: http://cookiecutter-django.readthedocs.io/en/latest/developing-locally-webpack.html





Celery
^^^^^^

This app comes with Celery.

To run a celery worker:

.. code-block:: bash

    cd react_django_users
    celery -A react_django_users.taskapp worker -l info

Please note: For Celery's import magic to work, it is important *where* the celery commands are run. If you are in the same folder with *manage.py*, you should be right.








Deployment
----------



Heroku
^^^^^^

.. image:: https://www.herokucdn.com/deploy/button.png
    :target: https://heroku.com/deploy

See detailed `cookiecutter-django Heroku documentation`_.

.. _`cookiecutter-django Heroku documentation`: http://cookiecutter-django.readthedocs.io/en/latest/deployment-on-heroku.html




