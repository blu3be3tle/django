from django.urls import path
<<<<<<< HEAD
from tasks.views import manager_dashboard, user_dashboard, create_task, view_task, update_task, delete_task
=======
from tasks.views import manager_dashboard, user_dashboard, create_task, view_task
>>>>>>> 4437d40 (practice4: data get method)

urlpatterns = [
    path('manager_dashboard/', manager_dashboard, name="manager-dashboard"),
    path('user_dashboard/', user_dashboard),
<<<<<<< HEAD
    path('create_task/', create_task, name='create-task'),
    path('view_task/', view_task),
    path('update_task/<int:id>/', update_task, name='update-task'),
    path('delete_task/<int:id>/', delete_task, name='delete-task'),
]
=======
    path('create_task/', create_task),
    path('view_task/', view_task)
]
>>>>>>> 4437d40 (practice4: data get method)
