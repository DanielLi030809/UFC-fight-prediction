import joblib
import numpy as np
import onnx
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType
from onnxmltools.convert.xgboost.operator_converters.XGBoost import convert_xgboost
from onnxmltools.convert import convert_xgboost as convert_xgb

# Load the model
model = joblib.load("models/model.pickle")

# Rename feature names to f0, f1, f2, etc.
if hasattr(model, 'feature_name'):
    model.feature_name = [f'f{i}' for i in range(len(model.feature_name))]
elif hasattr(model, 'feature_names'):
    model.feature_names = [f'f{i}' for i in range(len(model.feature_names))]

# Define input features
initial_type = [('float_input', FloatTensorType([None, 28]))]  # 28 features as per your model

# Convert to ONNX - use convert_xgb instead of convert_sklearn for XGBoost models
onnx_model = convert_xgb(model, initial_types=initial_type)

# Save the model
with open("public/model.onnx", "wb") as f:
    f.write(onnx_model.SerializeToString())