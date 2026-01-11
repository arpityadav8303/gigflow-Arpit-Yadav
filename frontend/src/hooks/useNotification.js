import toast from 'react-hot-toast';

export const useNotification = () => {
  const success = (message) => {
    toast.success(message, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#10b981',
        color: '#fff',
        borderRadius: '8px',
      },
    });
  };

  const error = (message) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#ef4444',
        color: '#fff',
        borderRadius: '8px',
      },
    });
  };

  const loading = (message) => {
    return toast.loading(message, {
      position: 'top-right',
      style: {
        background: '#3b82f6',
        color: '#fff',
        borderRadius: '8px',
      },
    });
  };

  const promise = (
    promiseFunc,
    { loading: loadingMsg, success: successMsg, error: errorMsg }
  ) => {
    toast.promise(
      promiseFunc,
      {
        loading: loadingMsg || 'Loading...',
        success: successMsg || 'Success!',
        error: errorMsg || 'Error!',
      },
      {
        position: 'top-right',
        style: {
          borderRadius: '8px',
        },
      }
    );
  };

  const dismiss = (toastId) => {
    toast.dismiss(toastId);
  };

  const custom = (element) => {
    toast.custom(element, {
      position: 'top-right',
      duration: 3000,
    });
  };

  return {
    success,
    error,
    loading,
    promise,
    dismiss,
    custom,
  };
};