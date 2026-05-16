from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection  # Required for raw SQL

@csrf_exempt
def create_hacker(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        expertise = request.POST.get('expertise')

        if name and expertise:
            try:
                with connection.cursor() as cursor:
                    sql = "INSERT INTO hackers (name_, expertise) VALUES (%s, %s)"
                    cursor.execute(sql, [name, expertise])
                
                return HttpResponse(f"Hacker {name} created via Django!")
            except Exception as e:
                return HttpResponse(f"Database error: {str(e)}", status=500)

    return HttpResponse("Invalid request: Ensure name and expertise are provided", status=400)