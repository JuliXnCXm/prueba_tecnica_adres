from rest_framework import serializers
from acquisitions.models import Acquisition, AcquisitionHistory


class AcquisitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acquisition
        fields = ['id', 'budget', 'section', 'type', 'quantity', 'unit_value', 'total_value', 'acquisition_date', 'supplier', 'documentation', 'created_at', 'modified_at', 'active']
        
        
class AcquisitionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AcquisitionHistory
        fields = ['id', 'acquisition', 'field_modified', 'old_value', 'new_value', 'modified_at']