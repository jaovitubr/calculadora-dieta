function updateCalorieAdjustment() {
  const goal = document.getElementById('objetivo').value;
  const adjustmentGroup = document.getElementById('ajusteCaloriasGroup');
  const adjustmentDescription = document.getElementById('ajusteDescricao');
  const deficitInput = document.getElementById('deficit');

  if (goal === 'manter') {
    adjustmentGroup.classList.add('hidden');
    deficitInput.removeAttribute('required');
  } else {
    adjustmentGroup.classList.remove('hidden');
    deficitInput.setAttribute('required', 'required');

    if (goal === 'perder') {
      adjustmentDescription.textContent = 'Quantidade de calorias que você deseja reduzir da sua dieta para criar um deficit calórico e perder peso. Recomendado: 300-500 kcal.';
    } else if (goal === 'ganhar') {
      adjustmentDescription.textContent = 'Quantidade de calorias que você deseja adicionar à sua dieta para criar um superavit calórico e ganhar peso. Recomendado: 300-500 kcal.';
    }
  }
}

document.getElementById('objetivo').addEventListener('change', updateCalorieAdjustment);
updateCalorieAdjustment();

document.getElementById('dietaForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const gender = document.querySelector('input[name="sexo"]:checked').value;
  const weight = parseFloat(document.getElementById('peso').value);
  const height = parseFloat(document.getElementById('altura').value);
  const age = parseInt(document.getElementById('idade').value);
  const activityFactor = parseFloat(document.getElementById('atividade').value);
  const goal = document.getElementById('objetivo').value;
  const calorieAdjustment = parseInt(document.getElementById('deficit').value);
  const proteinPerKg = parseFloat(document.getElementById('proteinaPorKg').value);
  const fatPerKg = parseFloat(document.getElementById('gorduraPorKg').value);

  let bmr;
  if (gender === 'masculino') {
    bmr = (13.75 * weight) + (5 * height) - (6.75 * age) + 66.5;
  } else {
    bmr = (9.56 * weight) + (1.85 * height) - (4.68 * age) + 65.71;
  }

  const tdee = bmr * activityFactor;

  let dailyCalories;
  if (goal === 'perder') {
    dailyCalories = tdee - calorieAdjustment;
  } else if (goal === 'ganhar') {
    dailyCalories = tdee + calorieAdjustment;
  } else {
    dailyCalories = tdee;
  }

  const proteinGrams = proteinPerKg * weight;
  const proteinCalories = proteinGrams * 4;

  const fatGrams = fatPerKg * weight;
  const fatCalories = fatGrams * 9;

  const remainingCalories = dailyCalories - proteinCalories - fatCalories;
  const carbsGrams = remainingCalories / 4;
  const carbsCalories = carbsGrams * 4;

  const waterLiters = (weight * 35) / 1000;

  document.getElementById('tmb').textContent = bmr.toFixed(0) + ' kcal';
  document.getElementById('get').textContent = tdee.toFixed(0) + ' kcal';
  document.getElementById('calorias').textContent = dailyCalories.toFixed(0) + ' kcal';
  document.getElementById('agua').textContent = waterLiters.toFixed(1) + 'L';

  document.getElementById('proteina').textContent = proteinGrams.toFixed(0) + 'g';
  document.getElementById('proteina-cal').textContent = proteinCalories.toFixed(0) + ' kcal';

  document.getElementById('gordura').textContent = fatGrams.toFixed(0) + 'g';
  document.getElementById('gordura-cal').textContent = fatCalories.toFixed(0) + ' kcal';

  document.getElementById('carboidrato').textContent = carbsGrams.toFixed(0) + 'g';
  document.getElementById('carboidrato-cal').textContent = carbsCalories.toFixed(0) + ' kcal';

  document.getElementById('results').classList.add('show');
  document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
