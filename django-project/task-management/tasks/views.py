from django.shortcuts import render
from django.http import HttpResponse
from tasks.forms import TaskForm, TaskModelForm
from tasks.models import Employee, Task, TaskDetail, Project
from datetime import date
from django.db.models import Q, Count, Max, Min, Avg


# Create your views here.


def manager_dashboard(request):
    tasks = Task.objects.select_related(
        'details').prefetch_related('assigned_to').all()

    # tasks
    total_task = tasks.count()
    completed_task = Task.objects.filter(status='COMPLETED').count()
    in_progress_task = Task.objects.filter(status='IN_PROGRESS').count()
    pending_task = Task.objects.filter(status='PENDING').count()

    context = {
        'tasks': tasks,
        'total_task': total_task,
        'completed_task': completed_task,
        'in_progress_task': in_progress_task,
        'pending_task': pending_task
    }

    return render(request, "dashboard/manager-dashboard.html", context)


def user_dashboard(request):
    return render(request, "dashboard/user-dashboard.html")


def create_task(request):
    # employees = Employee.objects.all()
    form = TaskModelForm()  # For GET

    if request.method == "POST":
        form = TaskModelForm(request.POST)
        if form.is_valid():

            """ For Model Form Data """
            form.save()

            return render(request, 'task_form.html', {"form": form, "message": "task added successfully"})

    context = {"form": form}
    return render(request, "task_form.html", context)


def view_task(request):
    projects = Project.objects.annotate(
        num_task=Count('task')).order_by('num_task')
    return render(request, "show_task.html", {"projects": projects})
