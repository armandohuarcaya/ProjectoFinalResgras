from rest_framework import serializers, viewsetsfrom comprobante.models.comprobante import Comprobantefrom reserva.models.reserva import Reservafrom rest_framework import statusfrom rest_framework.response import Responseimport logginglog = logging.getLogger(__name__)def generaCeros(codigo):    codigoInicial = "0000"    codigoInicial = str(codigoInicial)    if codigo < 9:        codigoInicial = codigoInicial    elif codigo > 9 and codigo <= 99:        codigoInicial = "000"    elif codigo > 99 and codigo <= 999:        codigoInicial = "00"    elif codigo > 999 and codigo <= 9999:        codigoInicial = "0"    elif codigo > 9999 and codigo <= 99999:        codigoInicial = ""    return codigoInicialdef generaCodigo():    codigo = Comprobante.objects.all().count()    if codigo == None:        codigo = 1    codigo = codigo + 1    codigo = generaCeros(codigo) + str(codigo)    print(codigo)    return codigoclass ComprobanteSaveSerializer(serializers.Serializer):    reserva = serializers.PrimaryKeyRelatedField(allow_null=True, queryset=Reserva.objects.all(), required=False)class ComprobanteSerializer(serializers.ModelSerializer):    class Meta:        model = Comprobante        fields = '__all__'class ComprobanteViewSet(viewsets.ModelViewSet):    queryset = Comprobante.objects.all()    serializer_class = ComprobanteSerializerclass ComprobanteSaveViewSet(viewsets.ViewSet):    queryset = Comprobante.objects.all()    serializer_class = ComprobanteSerializer    def list(self, request):        comprobante = Comprobante.objects.all()        serializer = ComprobanteSerializer(comprobante, many=True, )        print(serializer)        return Response(serializer.data)    def create(self, request):        serializer = ComprobanteSaveSerializer(data=request.data)        if serializer.is_valid():            # codigo_reserva = serializer.data['codigo_reserva']            reserva = serializer.data['reserva']            reserva = Reserva.objects.get(id=reserva)            costo_total= reserva.costo_total            reserva = reserva            igv = costo_total*0.18            precio_venta = costo_total-igv            print(costo_total,precio_venta,igv)            comprobante = Comprobante(codigo_comprobante=generaCodigo(),reserva_id=reserva.id,valor_venta=precio_venta,\                                                                                           precio_venta=costo_total,igv=igv)            comprobante.save()            #Reserva.objects.filter(id=reserva).update(costo_total=costo_implemento_res+costo_cancha_res)            return Response(serializer.data, status=status.HTTP_201_CREATED)        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)