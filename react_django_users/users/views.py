# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals
import time

from django.core.urlresolvers import reverse
from django.views.generic import DetailView, ListView, RedirectView, UpdateView
from django.http import JsonResponse

from django.contrib.auth.mixins import LoginRequiredMixin

from .models import User


# TODO: auth user in ajax
# class UserDetailView(LoginRequiredMixin, DetailView):
class UserDetailView(DetailView):
    model = User
    # These next two lines tell the view to index lookups by username
    slug_field = 'username'
    slug_url_kwarg = 'username'

    def render_to_response(self, context, **response_kwargs):

        # if self.request.is_ajax():
        if self.request.GET.get('format') == 'json':
            user = context.get('user')

            data = {
                'data': {
                    'id': user.id,
                    'username': user.username,
                    'name': user.name,
                    'lastLogin': time.mktime(user.last_login.timetuple()),
                }
            }

            return JsonResponse(data, **response_kwargs)

        return super(UserDetailView, self).render_to_response(context, **response_kwargs)


class UserRedirectView(LoginRequiredMixin, RedirectView):
    permanent = False

    def get_redirect_url(self):
        return reverse('users:detail',
                       kwargs={'username': self.request.user.username})


class UserUpdateView(LoginRequiredMixin, UpdateView):

    fields = ['name', ]

    # we already imported User in the view code above, remember?
    model = User

    # send the user back to their own page after a successful update
    def get_success_url(self):
        return reverse('users:detail',
                       kwargs={'username': self.request.user.username})

    def get_object(self):
        # Only get the User record for the user making the request
        return User.objects.get(username=self.request.user.username)


class UserListView(LoginRequiredMixin, ListView):
    model = User
    # These next two lines tell the view to index lookups by username
    slug_field = 'username'
    slug_url_kwarg = 'username'
