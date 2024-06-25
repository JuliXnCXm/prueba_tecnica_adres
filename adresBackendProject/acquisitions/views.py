from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import status
from acquisitions.models import Acquisition , AcquisitionHistory
from acquisitions.serializers import AcquisitionSerializer , AcquisitionHistorySerializer

class AcquisitionListView(APIView):
    def post(self, request):
        """
        Retrieves all acquisitions.

        Args:
        request (HttpRequest): The HTTP request object.

        Returns:
        Response: A JSON response containing a list of all acquisitions.

        Raises:
        Http404: If no acquisitions are found.
        """
        acquisitions = Acquisition.objects.all()
        
        if len(request.data) != 0:
            for key, value in request.data.items():
                if key in ['section', 'type', 'supplier', 'documentation']:
                    acquisitions = acquisitions.filter(**{f'{key}__icontains': value.lower()})
                elif key in ['quantity', 'unit_value', 'total_value', 'budget']:
                    acquisitions = acquisitions.filter(**{f'{key}__gt': value})
                elif key == 'active':
                    print(True if value == 'Activo' else False)
                    if value == 'All':
                        acquisitions = acquisitions.filter(active__in=[True, False])
                    else :
                        True if value == 'Activo' else False
                        print()
                        acquisitions = acquisitions.filter(active=(True if value == 'Activo' else False) )
        serializer = AcquisitionSerializer(acquisitions, many=True)
        return Response(serializer.data)

class AcquisitionDetailView(APIView):
    def get_object(self, pk):
        """
            Retrieves a specific acquisition by its primary key.

            Args:
            pk (int): The primary key of the acquisition to retrieve.

            Returns:
            Acquisition: The acquisition object with the given primary key.

            Raises:
            Http404: If the acquisition with the given primary key does not exist.
        """
        try:
            return Acquisition.objects.get(pk=pk)
        except Acquisition.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        """
            Retrieves a specific acquisition by its primary key.

            Args:
            request (HttpRequest): The HTTP request object.
            pk (int): The primary key of the acquisition to retrieve.

            Returns:
            Response: A JSON response containing the data of the acquisition with the given primary key.

            Raises:
            Http404: If the acquisition with the given primary key does not exist.
        """
        acquisition = self.get_object(pk=pk)
        serializer = AcquisitionSerializer(acquisition)
        return Response(serializer.data)

    def delete(self, request, pk):
        """
            Deletes a specific acquisition by its primary key.

            Args:
            request (HttpRequest): The HTTP request object.
            pk (int): The primary key of the acquisition to delete.

            Returns:
            Response: A JSON response with status code 204 (No Content) indicating successful deletion.

            Raises:
            Http404: If the acquisition with the given primary key does not exist.
        """
        acquisition = self.get_object(pk=pk)
        acquisition.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        """
            Updates a specific acquisition by its primary key.

            Args:
            request (HttpRequest): The HTTP request object.
            pk (int): The primary key of the acquisition to update.

            Returns:
            Response: A JSON response containing the updated data of the acquisition with the given primary key.

            Raises:
            Http404: If the acquisition with the given primary key does not exist.

            Updates the specified acquisition with the data provided in the request. If any field is updated,
            it creates a new AcquisitionHistory entry to record the old and new values of the modified field.
            If the request data is not valid, it returns a JSON response with status code 400 (Bad Request)
            containing the validation errors.
        """
        acquisition = self.get_object(pk=pk)
        serializer = AcquisitionSerializer(acquisition, data=request.data, partial=True)
        if serializer.is_valid():
            for field, value in serializer.validated_data.items():
                if getattr(acquisition, field)!= value:
                    AcquisitionHistory.objects.create(
                        acquisition=acquisition,
                        field_modified=field,
                        old_value=getattr(acquisition, field),
                        new_value=value
                    )
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AcquisitionCreateView(APIView):
    def post(self, request):
        """
            Creates a new acquisition.

            Args:
            request (HttpRequest): The HTTP request object containing the data for the new acquisition.

            Returns:
            Response: A JSON response containing the data of the newly created acquisition, with status code 201 (Created).

            Raises:
            ValueError: If the data provided in the request is not valid.
        """
        serializer = AcquisitionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class AcquisitionHistoryView(APIView):
    
    serializer_class = AcquisitionHistorySerializer

    def get(self, request, pk):
        """
            Retrieves all acquisition history entries for a specific acquisition.

            Args:
            request (HttpRequest): The HTTP request object.
            pk (int): The primary key of the acquisition to retrieve its history.

            Returns:
            Response: A JSON response containing a list of all acquisition history entries for the specified acquisition.

            Raises:
            Http404: If the acquisition with the given primary key does not exist.
        """
        try:
            acquisition = Acquisition.objects.get(pk=pk)
        except Acquisition.DoesNotExist:
            raise Http404

        adquisicion_historicos = AcquisitionHistory.objects.filter(acquisition=pk)
        serializer = self.serializer_class(adquisicion_historicos, many=True)

        return Response(serializer.data)
