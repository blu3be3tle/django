from django.shortcuts import render
from django.http import HttpResponse
from tasks.forms import TaskForm, TaskModelForm
from tasks.models import Employee, Task, TaskDetail, Project
from django.db.models import Q, Count

# Create your views here.


def manager_dashboard(request):
    return render(request, "dashboard/manager-dashboard.html")


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
    # retrieve all data from task model
    # tasks = Task.objects.filter(Q(status='PENDING') | Q(status='IN_PROGRESS'))
    # tasks = TaskDetail.objects.exclude(priority='L')
    """select_related (Foreign Key, OneToOneField)"""
    # tasks = Task.objects.select_related('Details').all()

    """prefetch related (reverse foreign key, manytomany)"""
    # tasks = Project.objects.prefetch_related('task_set').all()
    # tasks = Task.objects.prefetch_related('assigned_to').all()

    """aggregation"""
    projects = Project.objects.annotate(num_task=Count('task')).order_by('num_task')
    return render(request, "show_task.html", {"projects": projects})
    
