from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import os

@csrf_exempt 
def add_user(request):
    if request.method == 'POST':
        
        username = request.POST.get('user', 'Anonymous')
        
        file_path = r'D:\learn\web\users.txt'
        
        try:
            with open(file_path, 'a') as f:
                f.write(username + '\n')
            return HttpResponse(f"Successfully added {username} via Django")
        except Exception as e:
            return HttpResponse(f"File error: {str(e)}", status=500)
            
    return HttpResponse("Please use POST", status=400)