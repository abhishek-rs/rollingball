#pragma strict

import UnityEngine.UI;

    public var speed : float;
    public var countText : Text;
    public var rb : Rigidbody;
    private var count : int;
    public var win : Text;
    public var zeroAc: Vector3;
    public var curAc: Vector3;
    public var sensH: float = 10;
    public var sensV: float = 10;
    public var smooth: float = 0.5;
    public var GetAxisH: float = 0;
    public var GetAxisV: float = 0;

   	function Start ()
    {
   		ResetAxes();
        rb = GetComponent.<Rigidbody>();
        count = 0;
        setCountText();
        win.text = "";

    }

    function ResetAxes(){
    	zeroAc = Input.acceleration;
    	curAc = Vector3.zero;
    }


 	function FixedUpdate ()
    {
        var moveHorizontal : float = Input.GetAxis("Horizontal");
        var moveVertical : float = Input.GetAxis("Vertical");

        curAc = Vector3.Lerp(curAc, Input.acceleration-zeroAc, Time.deltaTime/smooth);
        GetAxisV = Mathf.Clamp(curAc.y * sensV, -1, 1);
        GetAxisH = Mathf.Clamp(curAc.x * sensH, -1, 1);

        var movement : Vector3 = new Vector3 (GetAxisH, 0.0f, GetAxisV);

        rb.AddForce (movement * speed);
    }

    function OnTriggerEnter (other : Collider) {
		if( other.gameObject.CompareTag ("PickUp")){
			other.gameObject.SetActive(false);
			count = count + 1;
			setCountText();
		}

	}

	function setCountText(){
		countText.text = "Count: " + count.ToString();
		if (count >= 23) {
			win.text = "You've won you brilliant piece of shit!";
		}
	}





	
	