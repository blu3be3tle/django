from django.shortcuts import render
from django.http import HttpResponse
from tasks.forms import TaskForm, TaskModelForm
from tasks.models import Employee, Task, TaskDetail

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
    tasks = Task.objects.filter(status='PENDING')
    # tasks = TaskDetail.objects.exclude(priority='L')
    return render(request, "show_task.html", {"tasks": tasks})
