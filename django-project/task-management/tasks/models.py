from django.db import models


def get_default_project():
    return Project.objects.get(pk=1)


class Project(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField()


class Employee(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)


class Task(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        default=get_default_project,
    )
    assigned_to = models.ManyToManyField(Employee, related_name='Tasks')
    title = models.CharField(max_length=250)
    description = models.TextField()
    due_date = models.DateField()
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class TaskDetail(models.Model):
    HIGH = 'H'
    MEDIUM = 'M'
    LOW = 'L'
    PRIORITY_OPTIONS = (
        (HIGH, 'High'),
        (MEDIUM, 'Medium'),
        (LOW, 'Low')
    )

    task = models.OneToOneField(
        Task,
        on_delete=models.CASCADE,
        related_name='Details')
    assigned_to = models.CharField(max_length=100)
    priority = models.CharField(
        max_length=6, choices=PRIORITY_OPTIONS, default=LOW)