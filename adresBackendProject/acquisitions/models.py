from django.db import models

class Acquisition(models.Model):
  budget = models.DecimalField(max_digits=15, decimal_places=2)
  section = models.CharField(max_length=100)
  type = models.CharField(max_length=200)
  quantity = models.IntegerField()
  unit_value = models.DecimalField(max_digits=15, decimal_places=2)
  total_value = models.DecimalField(max_digits=15, decimal_places=2)
  acquisition_date = models.DateField()
  supplier = models.CharField(max_length=200)
  documentation = models.TextField()
  created_at = models.DateTimeField(auto_created=True)
  modified_at = models.DateTimeField(auto_now=True)
  active = models.BooleanField(default=True)
  
  def __str__(self):
    return f"Acquisition {self.id} - {self.type}"
    
    
class AcquisitionHistory(models.Model):

    acquisition = models.ForeignKey(Acquisition, on_delete=models.CASCADE)
    modified_at = models.DateTimeField(auto_now_add=True)
    field_modified = models.CharField(max_length=50)
    old_value = models.TextField()
    new_value = models.TextField()

    def __str__(self):
        return f"Put of {self.adquisicion} on {self.fecha_modificacion}"