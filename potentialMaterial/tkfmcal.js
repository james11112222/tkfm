$(function(){
  calculate();
  $('input').change(calculate);
});

function calculate(){
  var low1 = parseInt($('#low1').val() || 0)
  var low2 = parseInt($('#low2').val() || 0)
  var low3 = parseInt($('#low3').val() || 0)
  var low4 = parseInt($('#low4').val() || 0)
  var low5 = parseInt($('#low5').val() || 0)
  var mid1 = parseInt($('#mid1').val() || 0)
  var mid2 = parseInt($('#mid2').val() || 0)
  var mid3 = parseInt($('#mid3').val() || 0)
  var mid4 = parseInt($('#mid4').val() || 0)
  var mid5 = parseInt($('#mid5').val() || 0)
  var advancedHigh1 = parseInt($('#advancedHigh1').val() || 0)
  var advancedHigh2 = parseInt($('#advancedHigh2').val() || 0)
  var advancedHigh3 = parseInt($('#advancedHigh3').val() || 0)
  var advancedHigh4 = parseInt($('#advancedHigh4').val() || 0)
  var advancedHigh5 = parseInt($('#advancedHigh5').val() || 0)
  var advancedHigh6 = parseInt($('#advancedHigh6').val() || 0)
  var advancedHigh7 = parseInt($('#advancedHigh7').val() || 0)
  var advancedHigh8 = parseInt($('#advancedHigh8').val() || 0)
  var advancedHigh9 = parseInt($('#advancedHigh9').val() || 0)
  var advancedHigh10 = parseInt($('#advancedHigh10').val() || 0)
  var highest1 = parseInt($('#highest1').val() || 0)
  var highest2 = parseInt($('#highest2').val() || 0)
  var highest3 = parseInt($('#highest3').val() || 0)
  var highest4 = parseInt($('#highest4').val() || 0)
  var highest5 = parseInt($('#highest5').val() || 0)
  var highest6 = parseInt($('#highest6').val() || 0)
  var highest7 = parseInt($('#highest7').val() || 0)
  var highest8 = parseInt($('#highest8').val() || 0)
  var highest9 = parseInt($('#highest9').val() || 0)
  var highest10 = parseInt($('#highest10').val() || 0)

  $('#calcuLow1').text( low1 + advancedHigh4*4 + highest4*8 + advancedHigh8*4 + highest8*8 );
  $('#calcuLow2').text( low2 + advancedHigh7*4 + highest7*8 + advancedHigh10*4 + highest10*8 );
  $('#calcuLow3').text( low3 + advancedHigh2*4 + highest2*8 + advancedHigh5*4 + highest5*8 );
  $('#calcuLow4').text( low4 + advancedHigh1*4 + highest1*8 + advancedHigh6*4 + highest6*8 );
  $('#calcuLow5').text( low5 + advancedHigh3*4 + highest3*8 + advancedHigh9*4 + highest9*8 );
  $('#calcuMid1').text( mid1 + advancedHigh1*4 + highest1*8 + advancedHigh5*4 + highest5*8 + highest6*3 + highest7*3 );
  $('#calcuMid2').text( mid2 + advancedHigh2*4 + highest2*8 + advancedHigh6*4 + highest6*8 + highest8*3 + highest10*3 );
  $('#calcuMid3').text( mid3 + advancedHigh3*4 + highest3*8 + advancedHigh10*4 + highest10*8 + highest4*3 + highest9*3 );
  $('#calcuMid4').text( mid4 + advancedHigh4*4 + highest4*8 + advancedHigh8*4 + highest8*8 + highest1*3 + highest3*3 );
  $('#calcuMid5').text( mid5 + advancedHigh7*4 + highest7*8 + advancedHigh9*4 + highest9*8 + highest2*3 + highest5*3 );
  $('#calcuHigh1').text( $('#high1').val() || 0);
  $('#calcuHigh2').text( $('#high2').val() || 0);
  $('#calcuHigh3').text( $('#high3').val() || 0);
  $('#calcuHigh4').text( $('#high4').val() || 0);
  $('#calcuHigh5').text( $('#high5').val() || 0);
}