from django.contrib import admin
from acquisitions.models import Acquisition


@admin.register(Acquisition)
class AcquisitionAdmin(admin.ModelAdmin):
  pass